import { Injectable, NotFoundException } from '@nestjs/common';
import { ignoreElements } from 'rxjs';
import { Character } from './character.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { title } from 'process';

@Injectable()
export class CharacterService {


    constructor(@InjectModel('Character') private readonly characterModel: Model<Character>) { }

    async insertCharacter(name: string, death: string, species: string, relation: string, lastEpisode: string,) {
        const newCharacter = new this.characterModel({name: name, death: death, species: species, relationToRick: relation, lastEpisodePresent: lastEpisode });
        const result = await newCharacter.save();
        return result.id as string;
    }

    async getAllCharacters() {
        const characters = await this.characterModel.find().exec();
        return characters.map(char => ({ id: char.id, name: char.name, death: char.death, species: char.species, relationToRick: char.relationToRick, lastEpisodePresent: char.lastEpisodePresent }));
    }

    async getAliveCharacters() {
        const characters = await this.characterModel.find().exec();
        const result = characters.filter((e)=>e.death==="Alive" || e.death==="alive");

        console.log("hi " + result);

        return result.map(char => ({ id: char.id, name: char.name, death: char.death, species: char.species, relationToRick: char.relationToRick, lastEpisodePresent: char.lastEpisodePresent }));
    }

    async getDeadCharacters() {
        const characters = await this.characterModel.find().exec();
        const result = characters.filter((e)=>e.death!=="Alive");

        console.log("hi " + result);

        return result.map(char => ({ id: char.id, name: char.name, death: char.death, species: char.species, relationToRick: char.relationToRick, lastEpisodePresent: char.lastEpisodePresent }));
    }

    async getCharacterById(characterId: string) {
        const character = await (await this.findCharacter(characterId));
        return { id: character.id, name: character.name, death: character.death, species: character.species, relationToRick: character.relationToRick, lastEpisodePresent: character.lastEpisodePresent, };
    }


    async updateCharacterById(characterId: string, charName: string, charDeath: string, charSpecies: string, charRelationToRick: string, charLastEpisodePresent: string) {
        const updatedCharacter = await this.findCharacter(characterId);

        if (charName) {
            updatedCharacter.name = charName;
        }
        if (charDeath) {
            updatedCharacter.death = charDeath;
        }
        if (charSpecies) {
            updatedCharacter.species = charSpecies;
        }
        if (charRelationToRick) {
            updatedCharacter.relationToRick = charRelationToRick;
        }
        if (charLastEpisodePresent) {
            updatedCharacter.lastEpisodePresent = charLastEpisodePresent;
        }
        updatedCharacter.save();
    }

    async deleteCharacterById(characterId: string) {
        const result = await this.characterModel.deleteOne({ _id: characterId }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('character does not exist');
        }
    }

    async deleteAllCharacters() {
        const characters = await this.characterModel.find().exec();
        for (let i = 0; i < characters.length; i++) {
            const p = characters.map(char => ({ id: char.id, name: char.name, death: char.death, species: char.species, relationToRick: char.relationToRick, lastEpisodePresent: char.lastEpisodePresent }));
            characters[i].deleteOne(char.id);
        }
    }

    private async findCharacter(characterId: string): Promise<Character> {
        let character;
        try {
            character = await this.characterModel.findById(characterId)

        } catch (error) {
            throw new NotFoundException('character does not exist');

        }
        if (!character) {
            throw new NotFoundException('character does not exist');
        }
        return character;
    }
}