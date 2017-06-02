const State = {
  name: 'default',
};

export default function(state = State, action) {
  switch (action.type) {
    case 'CHANGE_THEME':
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
}
