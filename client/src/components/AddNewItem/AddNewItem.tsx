import { Button } from '@mui/material';

import { addNewBoardStyle, addNewColumnStyle } from '../../app/styles/styles';
import { Entity } from '../../types/index.ts';

type NewItemProps = {
  onAdd(text: string): void;
  dark?: boolean;
  entity: Entity;
};

export const AddNewItem = (props: NewItemProps) => {
  const { onAdd, entity } = props;

  const addItemStyle =
    entity === 'Board' ? addNewBoardStyle : addNewColumnStyle;
  const buttonText = '+ Add New ' + entity;

  const handleClick = () => {
    console.log('Open ' + entity + ' Dialog');
  };

  return (
    <Button sx={addItemStyle} onClick={handleClick}>
      {buttonText}
    </Button>
  );
};
