import * as mongoose from 'mongoose';

export const CharacterSchema = new mongoose.Schema({ //these are each of the variables for each character
    name: {type: String, required:true},
    death: {type: String, required:true},
    species: {type: String, required:true},
    relationToRick: {type: String, required:true},
    lastEpisodePresent: {type: String, required:true}

});

export interface Character extends mongoose.Document {
    id: string,
    name: string,
    death: string,
    species: string,
    relationToRick: string,
    lastEpisodePresent: string,
}