const whatsappNumber = '5543996482559';
const checkoutForm = document.querySelector('#checkout-form');
const errorBox = document.querySelector('#form-error');
const successState = document.querySelector('#success-state');
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

function scrollToCheckout() {
  const checkout = document.querySelector('#checkout');
  if (checkout) checkout.scrollIntoView({ behavior: 'smooth' });
  if (navigation) navigation.classList.remove('is-open');
  if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
}

document.querySelectorAll('[data-scroll="checkout"]').forEach((button) => {
  button.addEventListener('click', scrollToCheckout);
});

if (menuToggle && navigation) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    if (navigation) navigation.classList.remove('is-open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
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

if (checkoutForm) {
  checkoutForm.addEventListener('submit', (event) => {
    event.preventDefault();
    showError('');

    const data = new FormData(checkoutForm);
    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const email = String(data.get('email') || '').trim();

    if (!name || !phone || !email) {
      showError('Preencha nome, WhatsApp e e-mail para continuar.');
      return;
    }
    if (!validEmail(email)) {
      showError('Confira o formato do seu e-mail.');
      return;
    }

    const message = [
      'Olá! Quero comprar o e-book Programação Sem Medo por R$ 25,90, em pagamento único via Pix.',
      '',
      `Nome: ${name}`,
      `WhatsApp: ${phone}`,
      `E-mail: ${email}`,
      '',
      'Pode me enviar a chave Pix? Após a confirmação do pagamento, quero receber o produto em PDF.'
    ].join('\n');

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    const popup = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (!popup) window.location.href = whatsappUrl;
    checkoutForm.hidden = true;
    if (successState) successState.hidden = false;
  });
}

document.querySelector('[data-reset]')?.addEventListener('click', () => {
  checkoutForm.reset();
  checkoutForm.hidden = false;
  if (successState) successState.hidden = true;
  showError('');
  document.querySelector('#checkout')?.scrollIntoView({ behavior: 'smooth' });
});
