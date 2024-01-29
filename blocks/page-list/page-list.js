// async function getJsonList(href) {
//   const pathName = new URL(href);
//   const resp = await fetch(pathName);
//   const json = await resp.json();
//
//   const jsonData = json.data;
//
//   console.log('=====JSON=====> {} ', jsonData);
//
//   const list = document.createElement('ul');
//
//   // eslint-disable-next-line guard-for-in,no-restricted-syntax
//   for (const index in jsonData) {
//     const page = jsonData[index].Page;
//     const title = jsonData[index].Title;
//     console.log(page);
//     console.log(title);
//     const listElement = document.createElement('li');
//     const anchorElement = document.createElement('a');
//     anchorElement.innerText = title;
//     anchorElement.href = window.origin + page;
//     listElement.append(anchorElement);
//     list.append(listElement);
//   }
//
//   return list;
// }
async function makeListElement(block) {
  const orgChildren = block.children;
  const parentId = orgChildren[0].innerText.trim();
  const parentPath = orgChildren[1].innerText.trim();

  const url = `http://localhost:8000/fileList?parentId=${parentId}`;

  const resp = await fetch(url);
  const jsonResp = await resp.json();

  const list = document.createElement('ul');

  jsonResp.forEach((item) => {
    let itemName = item.name;
    if (item.mimeType === 'application/vnd.google-apps.folder') {
      itemName += '/';
    }

    const listItem = document.createElement('li');
    const itemAnchor = document.createElement('a');
    itemAnchor.href = `${window.origin + parentPath}/${itemName}`;
    itemAnchor.innerText = item.name;
    listItem.append(itemAnchor);
    list.append(listItem);
  });

  return list;
}
export default async function decorate(block) {
  const listElement = await makeListElement(block);

  block.textContent = '';
  block.append(listElement);
}
