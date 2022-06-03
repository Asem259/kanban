import { Dispatch, SetStateAction } from 'react';

import { Button } from '@mui/material';

import { addNewBoardStyle, addNewColumnStyle } from '../../app/styles/styles';
import { Action, Entity } from '../../types/index.ts';

type NewItemProps = {
  setAction: Dispatch<SetStateAction<Action>>;
  dark?: boolean;
  entity: Entity;
};

export const AddNewItem = (props: NewItemProps) => {
  const { setAction, entity } = props;

  const addItemStyle =
    entity === 'Board' ? addNewBoardStyle : addNewColumnStyle;
  const buttonText = '+ Add New ' + entity;

  const handleClick = () => {
    setAction('Create');
  };

  return (
    <Button disableRipple sx={addItemStyle} onClick={handleClick}>
      {buttonText}
    </Button>
  );
};
