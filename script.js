const whatsappNumber = '5543996482559';
const checkoutForm = document.querySelector('#checkout-form');
const errorBox = document.querySelector('#form-error');
const successState = document.querySelector('#success-state');
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
const productChoice = document.querySelector('#product-choice');

function scrollToCheckout() {
  document.querySelector('#checkout')?.scrollIntoView({ behavior: 'smooth' });
  navigation?.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}

document.querySelectorAll('[data-scroll="checkout"]').forEach((button) => {
  button.addEventListener('click', () => {
    const selectedProduct = button.getAttribute('data-select-product');
    if (selectedProduct && productChoice) productChoice.value = selectedProduct;
    scrollToCheckout();
  });
});

if (menuToggle && navigation) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation?.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('.faq-item button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    if (!item) return;
    const wasOpen = item.classList.contains('is-open');
    document.querySelectorAll('.faq-item').forEach((faq) => {
      faq.classList.remove('is-open');
      faq.querySelector('button')?.setAttribute('aria-expanded', 'false');
    });
    if (!wasOpen) {
      item.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

function showError(message) {
  if (errorBox) errorBox.textContent = message;
}

function validEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

const productMessages = {
  main: 'Quero comprar o e-book principal Programação Sem Medo por R$ 25,90.',
  combo: 'Quero comprar os dois e-books: Programação Sem Medo + Programação sem Mistério, pelo combo de R$ 41,80.',
  bonus: 'Quero comprar o e-book bônus Programação sem Mistério por R$ 15,90.'
};

if (checkoutForm) {
  checkoutForm.addEventListener('submit', (event) => {
    event.preventDefault();
    showError('');

    const data = new FormData(checkoutForm);
    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const email = String(data.get('email') || '').trim();
    const selectedProduct = productChoice?.value || 'main';

    if (!name || !phone || !email) {
      showError('Preencha nome, WhatsApp e e-mail para continuar.');
      return;
    }
    if (!validEmail(email)) {
      showError('Confira o formato do seu e-mail.');
      return;
    }

    const message = [
      `Olá! ${productMessages[selectedProduct]}`,
      '',
      `Nome: ${name}`,
      `WhatsApp: ${phone}`,
      `E-mail: ${email}`,
      '',
      'Pode me enviar a chave Pix? Após a confirmação do pagamento, quero receber o(s) produto(s) em PDF.'
    ].join('\n');

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    const popup = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (!popup) window.location.href = whatsappUrl;
    checkoutForm.hidden = true;
    if (successState) successState.hidden = false;
  });
}

document.querySelector('[data-reset]')?.addEventListener('click', () => {
  checkoutForm?.reset();
  if (checkoutForm) checkoutForm.hidden = false;
  if (successState) successState.hidden = true;
  showError('');
  scrollToCheckout();
});
