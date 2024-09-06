export default function SettingsModal() {
  return (
    <dialog className={classes.dropdowns} ref={settingsModalRef}>
      <menu>
        <li className={classes.settings}>
          {`${user.username}'s workspace`} <img src={upIcon} alt="" />
        </li>
        <div
          className={classes.settings}
          onClick={() => {
            navigate("/settings");
            setOpenDropdown(false);
          }}
        >
          Settings
        </div>
        <div className={classes.logout} onClick={() => dispatch(logoutAsync())}>
          Log Out
        </div>
      </menu>
    </dialog>
  );
}
