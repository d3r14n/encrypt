var alphabet = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var special = ["~", "¡", "¢", "£", "¤", "¥", "¦", "§", "¨", "©", "ª", "«", "¬", "®", "¯", "°", "±", "²", "³", "´", "µ", "¶", "·", "¸", "¹", "º", "»", "¼", "½", "¾", "¿", "À", "Á", "Â", "Ã", "Ä", "Å", "Æ", "Ç", "È", "É", "Ê", "Ë", "Ì", "Í", "Î", "Ï", "Ð", "Ñ", "Ò", "Ó", "Ô", "Õ", "Ö", "×", "Ø", "Ù", "Ú", "Û", "Ü", "Ý", "Þ", "ß", "à", "á", "â", "ã", "ä", "å", "æ", "ç", "è", "é", "ê", "ë", "ì", "í", "î", "ï", "ð", "ñ", "ò", "ó", "ô", "õ", "ö", "÷", "ø", "ù", "ú", "û", "ü", "ý", "þ", "ÿ"];

var mostSpecial = ["☺", "☻", "♥", "♦", "♣", "♠", "•", "◘", "○", "◙", "♂", "♀", "♪", "♫", "☼", "►", "◄", "↕", "↕", "¶", "§", "▬", "↨", "↑", "↓", "→", "←", "∟", "↔", "▲", "▼"];

function getLetterPosition(letter)
{
    for (x = 0; x < alphabet.length; x++)
    {
        if (letter == alphabet[x])
        {
            l = x;
            break;
        }
    }
    return l;
}

// ENCRYPT
function showEncrypted()
{
    document.getElementById('p').innerHTML = encrypt(document.getElementById('text').value, document.getElementById('key').value);
}

function sendToEncrypt()
{
    ajax = new XMLHttpRequest();
    ajax.open("POST", "encrypt.php");
    ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    ajax.send("text="+encodeURIComponent(document.getElementById('text').value)+"&key="+encodeURIComponent(document.getElementById('key').value));
    ajax.onreadystatechange = function()
    {
        if (ajax.readyState == 4)
        {
            document.getElementById('p').innerHTML = ajax.responseText;
        }
    }
}


function transformLetter(letter, keyLetter)
{
    if(alphabet.includes(letter))
    {
        if(!alphabet.includes(keyLetter))
        {
            keyLetter = 0;
        }
        t = ((getLetterPosition(letter) + getLetterPosition(keyLetter)) + 1);
        if (t > (alphabet.length - 1))
        {
            t = t - (alphabet.length);
        }
        return alphabet[t];
    }
    else
    {
        return letter;
    }
}

function encrypt(text, key)
{
    ta = text.split("");
    ka = key.split("");
    y = 0;
    et = "";
    for (z = 0; z < ta.length; z++)
    {
        if(y >= ka.length)
        {
            y = 0;
        }
        et += transformLetter(ta[z], ka[y]);
        if (special.includes(ta[z]))
        {
            y++;
            if(y >= ka.length)
            {
                y = 0;
            }
            y++;
        }
        else
        {
            if (!mostSpecial.includes(ta[z]))
            {
                y++;
            }
        }
    }
    return et;
}

// Decrypt

function showDecrypted()
{
    document.getElementById('p').innerHTML = decrypt(document.getElementById('text').value, document.getElementById('key').value);
}

function sendToDecrypt()
{
    ajax = new XMLHttpRequest();
    ajax.open("POST", "decrypt.php");
    ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    ajax.send("text="+encodeURIComponent(document.getElementById('text').value)+"&key="+encodeURIComponent(document.getElementById('key').value));
    ajax.onreadystatechange = function()
    {
        if (ajax.readyState == 4)
        {
            document.getElementById('p').innerHTML = ajax.responseText;
        }
    }
}

function decipherLetter(letter, keyLetter)
{
    if(alphabet.includes(letter))
    {
        if(!alphabet.includes(keyLetter))
        {
            keyLetter = 0;
        }

        t = (getLetterPosition(keyLetter) + 1 - getLetterPosition(letter)) * (-1);

        if(t < 0)
        {
            t = t + (alphabet.length);
        }
        return alphabet[t];
    }
    else
    {
        return letter;
    }
}

function decrypt(text, key)
{
    ta = text.split("");
    ka = key.split("");
    y = 0;
    dt = "";
    for (z = 0; z < ta.length; z++)
    {
        if(y >= ka.length)
        {
            y = 0;
        }
        dt += decipherLetter(ta[z], ka[y]);
        if (special.includes(ta[z]))
        {
            y++;
            if(y >= ka.length)
            {
                y = 0;
            }
            y++;
        }
        else
        {
            if (!mostSpecial.includes(ta[z]))
            {
                y++;
            }
        }
    }
    return dt;
}