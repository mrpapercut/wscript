<?php

#header('Content-Type: text/plain');

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

		$out = array();
		array_push($out, "class ".strtolower(str_replace('.', '_', $filename))." {");
		array_push($out, "\tconstructor() {");
		foreach ($properties as $prop => $default) {
			array_push($out, "\t\t// ".$default);
			array_push($out, "\t\tthis.".$prop." = undefined;");
		}
	}
}