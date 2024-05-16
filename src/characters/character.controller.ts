import { Controller, Post, Patch, Delete, Body, Get, Param } from '@nestjs/common';
import { CharacterService } from './character.service';

@Controller('characters')
export class CharacterController {
    constructor(private readonly charactersService: CharacterService) { }


    @Post()
    async addCharacter(@Body('name') charName: string, @Body('death') charDeath: string, @Body('species') charSpecies: string, @Body('relationToRick') charRelation: string, @Body('lastEpisodePresent') charLastEpisode: string) {
        const generatedId = await this.charactersService.insertCharacter(charName, charDeath, charSpecies, charRelation, charLastEpisode);
        return { id: generatedId };
    }

    @Get()
    async getAllCharacters() {
        const characters = await this.charactersService.getAllCharacters();
        return characters;
    }

    @Get(':id')
    async getCharacterById(@Param('id') charId: string,) {
        const character  = await this.charactersService.getCharacterById(charId);
        return character;
    }

    @Patch(':id')
    async updateCharacterById(@Param('id') charId: string, @Body('name') charName: string, @Body('death') charDeath: string, @Body('species') charSpecies: string, @Body('relationToRick') charRelation: string, @Body('lastEpisodePresent') charLastEpisode: string) {
        await this.charactersService.updateCharacterById(charId, charName, charDeath, charSpecies, charRelation, charLastEpisode);
        return null;
    }

    @Delete(':id')
    async deleteCharacterById(@Param('id') charId: string,) {
        await this.charactersService.deleteCharacterById(charId);
        return null;
}

}