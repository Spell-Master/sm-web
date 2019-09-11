<?php
$buffer = "<svg\n";
$buffer .= "    xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'\n";
$buffer .= "    preserveAspectRatio='none'\n";
$buffer .= "    width='200' height='200' viewBox='0 0 200 200'>\n";
$buffer .= "    <image xlink:href='{$svg}' x='0' y='0' width='200' height='200'/>\n";
$buffer .= "</svg>";
return ($buffer);
