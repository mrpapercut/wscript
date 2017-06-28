$lines = Get-Content shared-objects.txt | Where {$_ -notmatch '^\s+$'}
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

	echo $info | Out-File ".\Objects\$comobj.txt"
}

# Class not found: AudioVBScript.1
# Class not found: JRO.JetEngine
# Class not found: JRO.Replica
# Class not found: Microsoft.DirectMusicAudioPath
# Class not found: Microsoft.DirectMusicBand
# Class not found: Microsoft.DirectMusicBandTrack
# Class not found: Microsoft.DirectMusicChordMap
# Class not found: Microsoft.DirectMusicChordTrack
# Class not found: Microsoft.DirectMusicComposer
# Class not found: Microsoft.DirectMusicGraph
# Class not found: Microsoft.DirectMusicMotifTrack
# Class not found: Microsoft.DirectMusicMuteTrack
# Class not found: Microsoft.DirectMusicScript
# Class not found: Microsoft.DirectMusicSection
# Class not found: Microsoft.DirectMusicSegment
# Class not found: Microsoft.DirectMusicSeqTrack
# Class not found: Microsoft.DirectMusicStyle
# Class not found: Microsoft.DirectMusicStyleTrack
# Class not found: Microsoft.DirectMusicSysExTrack
# Class not found: Microsoft.DirectMusicTemplate
# Class not found: Microsoft.DirectMusicTempoTrack
# Class not found: Microsoft.DirectMusicWaveTrack
# Class not found: mraut.MathRecognizer
# Class not found: MSDAORA.1
# Class not found: MSScriptControl.ScriptControl
# Class not found: QC.Recorder
# Class not found: SAPI.SpSharedRecoContext
# Class not found: SAPIEngine.TTSEngine
# Class not found: Search.CustomWordbreaker
# Class not found: Search.EmbeddedGatherMgr
# Class not found: Search.EmbeddedGatherNotify
# Class not found: Search.GatherTrx
# Class not found: Search.JetPropStore
# Class not found: Search.MAPI2Handler
# Class not found: SppComApi.TokenActivation
# Class not found: WbemScripting.SWbemLastError
# Class not found: WindowsInstaller.Message
# Class not found: WlanAdhoc.WlanAdhocLUA
# Class not found: WMDMCESP.WMDMCESP
# Class not found: WMINet_Utils.WmiSecurityHelper

# Unauthorized: ListPad.ListPad
# Unauthorized: MMCCtrl.MMCCtrl
# Unauthorized: MMCListPadInfo.MMCListPadInfo
# Unauthorized: MMCTask.MMCTask
# Unauthorized: Pdump.ProcessDump
# Unauthorized: SysColorCtrl.SysColorCtrl