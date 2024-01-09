async function getJsonList(href) {
  const pathName = new URL(href);
  const resp = await fetch(pathName);
  const json = await resp.json();

  const jsonData = json.data;

  console.log('=====JSON=====> {} ', jsonData);

  var list = document.createElement('ul');

  for (var index in jsonData) {
    var page = jsonData[index].Page;
    var title = jsonData[index].Title;
    console.log(page);
    console.log(title);
    let listElement = document.createElement('li');
    let anchorElement = document.createElement('a');
    anchorElement.innerText = title;
    anchorElement.href = page;
    listElement.append(anchorElement);
    list.append(listElement);
  }

  return list;
}
export default async function decorate(block) {
  // [...block.children].forEach((row) => {
  // console.log(row);
  const sheetElement = block.querySelector('a[href$=".json"]');
  var parentDiv = document.createElement('div');
  console.log(sheetElement);
  var listElement = await getJsonList(sheetElement.href);
  parentDiv.append(listElement);

  sheetElement.replaceWith(listElement);
  // });
}
