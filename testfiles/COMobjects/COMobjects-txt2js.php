<?php

header('Content-Type: text/plain');

$files = scandir('./Objects/');
foreach ($files as $file) {
	if ($file !== '.' && $file !== '..') {
		$methods = array();
		$properties = array();

		$filename = str_replace('.txt', '', $file);

		$content = explode("\n", file_get_contents('./Objects/'.$file));
		if (count($content) > 6) {
			for ($i = 6; $i < count($content); $i++) {
				if ($match = preg_match('/(\w+)\s*(Method|Property)\s*(.*)/', $content[$i], $matches)) {
					if ($matches[2] === 'Method') {
						$methods[$matches[1]] = trim($matches[3]);
					} else {
						$properties[$matches[1]] = trim($matches[3]);
					}
				}
			}
		}

        $T = '    ';
        $classname = strtolower(str_replace('.', '_', $filename));

		$out  = "class ".$classname." {\n"
        $out .= $T."constructor() {\n";
		foreach ($properties as $prop => $default) {
			$out .= $T.$T."// ".$default."\n";
			$out .= $T.$T."this.".$prop." = undefined;\n\n";
		}
        $out .= $T."}\n\n";

        foreach ($methods as $method => $default) {
            $out .= $T."//".$default."\n";
            if (preg_match('/\w+\s(\w+)\s\(([\w\s,]+)\)/', $default, $matches)) {
                $out .= $T.$matches[1]."(".$matches[2].")";
            } else {
                $out .= $T.$default."()";
            }
            $out .= " {\n\n\t}\n\n";
        }

        $out .= "}\n\nmodule.exports = ".$classname;


	}
}