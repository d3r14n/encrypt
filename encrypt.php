<?php

function getLetterPosition($letter)
{
	$alphabet = array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z");
    for ($x = 0; $x < count($alphabet); $x++)
    {
        if ($letter == $alphabet[$x])
        {
            $l = $x;
            break;
        }
    }
    return $l;
}

function transformLetter($letter, $keyLetter)
{
	$alphabet = array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z");
    if(in_array($letter, $alphabet))
    {
        if(!in_array($keyLetter, $alphabet))
        {
            $keyLetter = 0;
        }
        $t = ((getLetterPosition($letter) + getLetterPosition($keyLetter)) + 1);
        if ($t > (count($alphabet) - 1))
        {
            $t = $t - (count($alphabet));
        }
        return $alphabet[$t];
    }
    else
    {
        return $letter;
    }
}

function encrypt($text, $key)
{
	$ta = str_split($text);
	$ka = str_split($key);
    $y = 0;
    $et = "";
    for ($z = 0; $z < count($ta); $z++)
    {
        if($y >= count($ka))
        {
            $y = 0;
        }
        $et .= transformLetter($ta[$z], $ka[$y]);
        $y++;
    }
    return $et;
}

echo encrypt($_POST['text'], $_POST['key']);

?>