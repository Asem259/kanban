import { Button } from '@mui/material';

import { addNewBoardStyle } from '../../app/styles/boardStyle';
import { addNewCardStyle } from '../../app/styles/cardStyle';
import { addNewColumnStyle } from '../../app/styles/columnStyle';
import { Entity } from '../../types/index.ts';
import { useAppDispatch } from '../../app/store/hooks';
import { setAction } from '../../app/store/boardSlice';

interface Props {
  entity: Entity;
}

export const AddNewItem = ({ entity }: Props) => {
  const dispatch = useAppDispatch();

  const addItemStyle =
    entity === 'Board'
      ? addNewBoardStyle
      : entity === 'Column'
      ? addNewColumnStyle
      : addNewCardStyle;

  const buttonText = '+ Add New ' + entity;

  const handleClick = () => {
    dispatch(setAction({ action: 'Create', entity }));
  };

  return (
    <Button
      disableRipple
      sx={(theme) => ({ ...addItemStyle })}
      onClick={handleClick}
    >
      {buttonText}
    </Button>
  );
};
