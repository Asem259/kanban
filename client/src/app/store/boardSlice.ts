import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DragItem, SetActionPayload } from '../../types/index.ts';
import { BoardState } from '../../types/stateTypes';

import { RootState } from './store';

const storedCurrentBoard = localStorage.getItem('currentBoard');
const initialState: BoardState = {
  currentBoard: storedCurrentBoard || '',
  action: null,
  id: '',
  title: '',
  entity: null,
  draggedItem: null,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setCurrentBoard: (state, action: PayloadAction<string>) => {
      state.currentBoard = action.payload;
      localStorage.setItem('currentBoard', action.payload);
    },
    setAction: (state, action: PayloadAction<SetActionPayload | null>) => {
      if (!action.payload) {
        state.action = null;
        state.id = '';
        state.title = '';
        state.entity = null;
      } else {
        state.action = action.payload.action;
        state.id = action.payload.id || '';
        state.title = action.payload.title || '';
        state.entity = action.payload.entity || null;
      }
    },
    setDraggedItem: (state, action: PayloadAction<DragItem | null>) => {
      state.draggedItem = action.payload;
    },
  },
});

export const selectAction = createSelector(
  (state: RootState) => state.board,
  (board) => board
);

export const { setCurrentBoard, setAction, setDraggedItem } =
  boardSlice.actions;
export const selectCurrentBoard = createSelector(
  (state: RootState) => state.board,
  (board) => board.currentBoard
);
