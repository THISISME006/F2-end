function getMenu() {
  return fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json')
    .then(response => response.json())
    .then(data => {
      // Display food items to the user
      console.log(data);
    })
    .catch(error => {
      // Handle any errors during the fetch
      console.error('Error fetching menu:', error);
    });
}

function takeOrder() {
  return new Promise(resolve => {
    setTimeout(() => {
      // Randomly select 3 burgers
      const burgers = getRandomBurgers(3);
      const order = { burgers: burgers };

      resolve(order);
    }, 2500);
  });
}

function getRandomBurgers(count) {
  const menu = [
    {
      "id": 1,
      "name": "Cheeseburger",
      "price": 5.99,
      "imgSrc": "https://source.unsplash.com/random/1920x1080/?cheeseburger"
    },
    // ... Rest of the menu items
  ];

  const randomBurgers = [];
  const totalBurgers = menu.filter(item => item.name.toLowerCase().includes('burger'));
  const selectedIndices = [];

  while (randomBurgers.length < count && selectedIndices.length < totalBurgers.length) {
    const randomIndex = getRandomIndex(totalBurgers.length, selectedIndices);
    const randomBurger = totalBurgers[randomIndex];

    randomBurgers.push(randomBurger);
    selectedIndices.push(randomIndex);
  }

  return randomBurgers;
}

function getRandomIndex(max, exclude) {
  const randomIndex = Math.floor(Math.random() * max);
  return exclude.includes(randomIndex) ? getRandomIndex(max, exclude) : randomIndex;
}

function orderPrep() {
  return new Promise(resolve => {
    setTimeout(() => {
      const orderStatus = true;
      const paid = false;
      const order = { order_status: orderStatus, paid: paid };

      resolve(order);
    }, 1500);
  });
}

function payOrder() {
  return new Promise(resolve => {
    setTimeout(() => {
      const orderStatus = true;
      const paid = true;
      const order = { order_status: orderStatus, paid: paid };

      resolve(order);
    }, 1000);
  });
}

function thankyouFnc() {
  alert('Thank you for eating with us today!');
}

// Promise chaining
getMenu()
  .then(() => takeOrder())
  .then(order => {
    console.log('Order:', order);
    return orderPrep();
  })
  .then(order => {
    console.log('Order prepared:', order);
    return payOrder();
  })
  .then(order => {
    console.log('Order paid:', order);
    thankyouFnc();
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });
