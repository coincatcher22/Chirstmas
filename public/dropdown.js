/* global canvas createButton createDropdownRow */
const buttonElements = ['info', 'changeRandom()', 'r', 'random', '<u>R</u>andom mode: <span id="change-random">On</span>'];
const dropdownElements = [[['info dropdown-toggle', '', 'c', 'palette', '<span id="change-color-text"><u>C</u>hange color</span>'], 'change-color', [['14', 'Custom color <input type="color" value="#ff0000" id="customColor" />'], ['15', 'Random (same colors)'], ['16', 'Random (different colors)']]]];
const dropdownRow = createDropdownRow(dropdownElements);
dropdownRow.insertBefore(createButton(...buttonElements), dropdownRow.children[0]);
document.body.insertBefore(dropdownRow, canvas);
dropdownRow.children[1].children[1].children[0].id = 'custom';
