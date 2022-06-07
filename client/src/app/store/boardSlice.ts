import { createSelector, createSlice } from '@reduxjs/toolkit';

import { Action, Entity } from '../../types/index.ts';
import { RootState } from './store';

interface InitialState {
  currentBoard: string;
  action: Action;
  id: string;
  title: string;
  entity: Entity | null;
}

const storedCurrentBoard = localStorage.getItem('currentBoard');
const initialState: InitialState = {
  currentBoard: storedCurrentBoard || '',
  action: null,
  id: '',
  title: '',
  entity: null,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setCurrentBoard: (state, action) => {
      console.log(action);
      state.currentBoard = action.payload;
      localStorage.setItem('currentBoard', action.payload);
    },
    setAction: (state, action) => {
      if (!action.payload) {
        state.action = null;
        state.id = '';
        state.title = '';
        state.entity = null;
      } else {
        state.action = action.payload.action;
        state.id = action.payload.id;
        state.title = action.payload.title;
        state.entity = action.payload.entity;
      }
    },
  },
});

export const selectAction = createSelector(
  (state: RootState) => state.board,
  (board) => board
);

export const { setCurrentBoard, setAction } = boardSlice.actions;
