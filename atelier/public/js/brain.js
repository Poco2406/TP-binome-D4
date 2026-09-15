export function validateMessage(raw) {
    if (typeof raw !== 'string') {
    return { ok: false, error: 'Le message doit être du texte' };
    } 

const texte = raw.trim();
if (texte === '') {
    return { ok: false, error: 'Le message ne doit pas être vide' };
    }

    if (texte.length > 280) {
    return { ok: false, error: 'Le message est trop long (280 caractères maximum)' };
    }

return { ok: true, value: texte };
}

export function replyTo(message) {
const texte = message.trim().toLowerCase();
    if (texte === 'salut' || texte === 'bonjour') {
        return { ok: true, value: 'Bonjour !' };
    }

    if (texte === 'aide') {
        return { ok: true, value: 'Que puis-je faire pour vous ?' };
    }

    if (texte === 'test') {
        return { ok: true, value: 'test réussi' };
    }
return { ok: false, error: 'Je ne comprends pas votre message.' };
}