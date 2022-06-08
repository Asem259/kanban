import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { addNewBoardStyle } from '../app/styles/boardStyle';
import { addNewCardStyle } from '../app/styles/cardStyle';
import { addNewColumnStyle } from '../app/styles/columnStyle';
import { Entity } from '../types/index.ts';
import { useAppDispatch } from '../app/store/hooks';
import { setAction } from '../app/store/boardSlice';
import { useState } from 'react';
import { AddNewCardForm } from './AddNewCardForm';

interface Props {
  entity: Entity;
  columnId?: string;
}

export const AddNewItem = ({ entity, columnId }: Props) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const addItemStyle =
    entity === 'Board'
      ? addNewBoardStyle
      : entity === 'Column'
      ? addNewColumnStyle
      : addNewCardStyle;

  const buttonText = '+ Add New ' + entity;

  const handleClick = () => {
    if (entity === 'Card') {
      setShowForm(true);
    } else {
      dispatch(setAction({ action: 'Create', entity }));
    }
  };

  return !showForm ? (
    <Button
      disableRipple
      sx={(theme) => ({ ...addItemStyle })}
      onClick={handleClick}
    >
      {buttonText}
    </Button>
  ) : (
    <ClickAwayListener onClickAway={() => setShowForm(false)}>
      <AddNewCardForm columnId={columnId as string} />
    </ClickAwayListener>
  );
};
