type Wand = {
  wood: string,
  core: string,
  length: number
}

export type Character = {
  id: string | undefined,
  name: string;
  house: string;
  image: string;
  alternate_names: string[],
  species: string,
  gender: string,
  dateOfBirth: string,
  yearOfBirth: number,
  wizard: boolean,
  ancestry: string,
  eyeColour: string,
  hairColour: string,
  wand: Wand,
  patronus: string,
  hogwartsStudent: boolean,
  hogwartsStaff: boolean,
  actor: string,
  alternate_actors: string[],
  alive: boolean,
  guessed?: boolean,
  attempts?: number,
}

export type House = {
  id: string;
  name: string;
  image: string;
};


export type RootStackParamList = {
  'Main': undefined;
  'Details': {
    character: Character | undefined;
  };
}

export type BottomNavParamList = {
  'Home': {
    character?: Character | undefined;
  };
  'List': undefined
}
