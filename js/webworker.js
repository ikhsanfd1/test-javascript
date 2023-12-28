// This web worker listens for messages and performs the checkout process
self.addEventListener('message', (event) => {
  if (event.data === 'checkout') {
    // Simulate time-consuming checkout process
    setTimeout(() => {
      self.postMessage('checkout');
    }, 2000);
  }
});
