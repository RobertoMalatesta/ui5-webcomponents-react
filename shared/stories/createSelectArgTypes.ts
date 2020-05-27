type ArgDefinition = {
  [key: string]: Record<string, string>;
};

export const createSelectArgTypes = (definition: ArgDefinition) => {
  const argTypes = {};

  for (let arg in definition) {
    argTypes[arg] = {
      control: {
        type: 'options',
        controlType: 'select',
        options: definition[arg]
      }
    };
  }

  return argTypes;
};