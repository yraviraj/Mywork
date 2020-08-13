// state = {
//     ingredient: {
//         salad: 1,
//         bacon: 1,
//         cheese: 2,
//         meat: 2
//     }
// }

// Object.keys(state.ingredient).map(ing => {

// })

const items =[
    {name: "bike", price: 50000},
    {name: "tv", price: 15000},
    {name: "album", price: 50},
    {name: "book", price: 10},
    {name: "phone", price: 5000},
    {name: "computer", price: 25000},
    {name: "keyboard", price: 300}
];
// listing  all the item names using map method

const itemNames = items.map(item => item.name)

const itemNames1 = items.map(function(item){
    return item.name;
});

console.log(itemNames);
console.log(itemNames1);
