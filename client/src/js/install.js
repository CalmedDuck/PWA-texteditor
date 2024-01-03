const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Listen for the beforeinstallprompt event to show the install button
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault();
  // Stash the event so it can be triggered later.
  window.deferredPrompt = event;
  // Remove the hidden class from the button.
  butInstall.style.display = 'block';
});

// Implement a click event handler on the butInstall element
butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    // The deferred prompt isn't available.
    return;
  }
  // Show the install prompt
  promptEvent.prompt();
  // Wait for the user to respond to the prompt
  const result = await promptEvent.userChoice;
  // Optionally, send the user's response to your analytics.
  console.log('User response to the install prompt', result);
  // We've used the prompt, and can't use it again, clear it up
  window.deferredPrompt = null;
  // Hide the install button
  butInstall.style.display = 'none';
});

// Add an event handler for the appinstalled event
window.addEventListener('appinstalled', (event) => {
  // Clear the deferredPrompt so it can be garbage collected
  window.deferredPrompt = null;
  // Optionally, send analytics event to indicate successful installation
  console.log('PWA was installed', event);
  // You can also set a flag to check if the app was installed and hide the install button
});
