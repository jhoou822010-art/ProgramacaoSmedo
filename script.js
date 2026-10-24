const checkoutForm = document.querySelector('#checkout-form');
const formMessage = document.querySelector('#form-message');
const sellerWhatsApp = '5543996482559';

function showFormMessage(message, isSuccess = false) {
  formMessage.textContent = message;
  formMessage.classList.toggle('success', isSuccess);
}

function cleanPhone(phone) {
  return phone.replace(/\D/g, '');
}

checkoutForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = new FormData(checkoutForm);
  const name = String(formData.get('nome') || '').trim();
  const phone = String(formData.get('telefone') || '').trim();
  const email = String(formData.get('email') || '').trim();

  if (name.length < 2) {
    showFormMessage('Digite seu nome para continuar.');
    document.querySelector('#nome').focus();
    return;
  }

  if (cleanPhone(phone).length < 10) {
    showFormMessage('Digite um número de WhatsApp válido.');
    document.querySelector('#telefone').focus();
    return;
  }

  if (!email || !email.includes('@') || !email.includes('.')) {
    showFormMessage('Digite um e-mail válido para receber o atendimento.');
    document.querySelector('#email').focus();
    return;
  }

  const message = [
    'Olá! Quero comprar o e-book Programação Sem Medo.',
    '',
    `Nome: ${name}`,
    `WhatsApp: ${phone}`,
    `E-mail: ${email}`,
    '',
    'Pode me enviar as instruções para pagamento único de R$ 25,90 via Pix?'
  ].join('\n');

  const whatsappUrl = `https://wa.me/${sellerWhatsApp}?text=${encodeURIComponent(message)}`;
  showFormMessage('Abrindo o WhatsApp para finalizar o atendimento...', true);
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
});
