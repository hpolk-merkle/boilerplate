async function getJsonList(href) {
  const pathName = new URL(href);
  const resp = await fetch(pathName);
  const json = await resp.json();

  const jsonData = json.data;

  console.log('=====JSON=====> {} ', jsonData);

  const list = document.createElement('ul');

  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const index in jsonData) {
    const page = jsonData[index].Page;
    const title = jsonData[index].Title;
    console.log(page);
    console.log(title);
    const listElement = document.createElement('li');
    const anchorElement = document.createElement('a');
    anchorElement.innerText = title;
    anchorElement.href = page;
    listElement.append(anchorElement);
    list.append(listElement);
  }

  return list;
}
export default async function decorate(block) {
  const sheetElement = block.querySelector('a[href$=".json"]');
  const parentDiv = document.createElement('div');
  console.log(sheetElement);
  const listElement = await getJsonList(sheetElement.href);
  parentDiv.append(listElement);

  sheetElement.replaceWith(listElement);
}
