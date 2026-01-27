import { createListenerMiddleware } from '@reduxjs/toolkit';

import { getNewsItem, loadComments } from '../api/newsApi';
import { resetComments } from '../slices/newsItemSlice';

export const commentsMiddleware = createListenerMiddleware();

commentsMiddleware.startListening({
  actionCreator: getNewsItem.pending,
  effect: (action, listenerApi) => {
    listenerApi.dispatch(resetComments());
  },
});

commentsMiddleware.startListening({
  actionCreator: getNewsItem.fulfilled,
  effect: (action, listenerApi) => {
    const item = action.payload;

    if (item.kids) {
      listenerApi.dispatch(
        loadComments({ comments: item.kids, parentId: item.id }),
      );
    }
  },
});
