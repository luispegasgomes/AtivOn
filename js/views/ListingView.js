export default class ListingView {
  constructor() {
    this.users = JSON.parse(localStorage.users);
    this.listTab = document.getElementById("list-tab");
    this.navContent = document.getElementById("nav-tabContent");
    this.listUsers();
  }

  listUsers() {
    let textTab = "";
    let textNav = "";
    for (const user of this.users) {
      if (user.username !== "admin") {
        textTab += `<a
            class="list-group-item list-group-item-action"
            id="list-${user.username}-list"
            data-toggle="list"
            href="#list-${user.username}"
            role="tab"
            aria-controls="${user.username}"
            >${user.username}</a
          >`;
        textNav += `<article
          class="tab-pane fade"
          id="list-${user.username}"
          role="tabpanel"
          aria-labelledby="list-${user.username}-list"
        >
          <p><b>Nome:</b> ${user.name}</p>
          <p><b>Email:</b> ${user.email}</p>
          <p><b>Data de nascimento:</b> ${user.birthdate}</p>
          <p><b>Género:</b> ${user.gender}</p>
          <button class="btn fundoAmarelo corAzulEscuro font-weight-bold removeUser">Remover</button>
        </article>`;
      }
    }
    this.listTab.innerHTML = textTab;
    this.navContent.innerHTML = textNav;

    const btns = document.getElementsByClassName("removeUser");
    for (const btn of btns) {
      const parentId = btn.parentNode.id.split("-")[1];
      btn.addEventListener("click", () => {
        const newList = this.users.filter((user) => user.username != parentId);
        localStorage.setItem("users", JSON.stringify(newList));
        location.reload();
      });
    }
  }
}
