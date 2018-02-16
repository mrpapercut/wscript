$filename = (Get-WmiObject -class Win32_OperatingSystem).Caption.Trim() -replace ' ', '_'
$infile = ".\COMObjects-$($filename).txt"
$lines = Get-Content $infile | Where {$_ -notmatch '^\s+$'}

$objdir = ".\Objects"
if (!(Test-Path -Path $objdir)) {
    echo ".\Objects doesn't exist, creating folder"
    New-Item -ItemType directory -Path $objdir
}

echo "Scanning $($lines.Length) COMObjects"

foreach ($comobj in $lines) {
	try {
		$info = new-object -comobject $comobj | Get-Member
	}

	catch [System.UnauthorizedAccessException] {
		echo "Unauthorized: $comobj"
	}

	catch {
		echo "Class not found: $comobj"
	}

	echo $info | Out-File -Encoding "UTF8" ".\Objects\$comobj.txt"
}
