/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  // console.log(currentUser)
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
    canWelcome:currentUser && (currentUser.access === 'admin' || currentUser.access === 'user'),
    canIdentity: currentUser && currentUser.identity === 'maxAdmin',
    noNeed:false,
  };
}
