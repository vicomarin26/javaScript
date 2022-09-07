const salad = ['🍅', '🍄', '🥦', '🥒', '🌽', '🥕', '🥑'];

salad.pop();

// for (let i = 0; i < salad.length; i++) {
//     console.log(`Element at index ${i} is ${salad[i]}`);
// }


salad.splice(1, 1)
    // salad.shift()
for (let i = 0; i < salad.length; i++) {
    console.table(salad);
}