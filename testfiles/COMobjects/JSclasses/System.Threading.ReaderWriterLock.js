class system_threading_readerwriterlock {
    constructor() {
        // bool IsReaderLockHeld {get;}
        this.IsReaderLockHeld = undefined;

        // bool IsWriterLockHeld {get;}
        this.IsWriterLockHeld = undefined;

        // int WriterSeqNum {get;}
        this.WriterSeqNum = undefined;

    }

    // void AcquireReaderLock(int millisecondsTimeout), void AcquireReaderLock(timespan ...
    AcquireReaderLock() {

    }

    // void AcquireWriterLock(int millisecondsTimeout), void AcquireWriterLock(timespan ...
    AcquireWriterLock() {

    }

    // bool AnyWritersSince(int seqNum)
    AnyWritersSince() {

    }

    // void DowngradeFromWriterLock([ref] System.Threading.LockCookie lockCookie)
    DowngradeFromWriterLock() {

    }

    // bool Equals(System.Object obj)
    Equals() {

    }

    // int GetHashCode()
    GetHashCode() {

    }

    // type GetType()
    GetType() {

    }

    // System.Threading.LockCookie ReleaseLock()
    ReleaseLock() {

    }

    // void ReleaseReaderLock()
    ReleaseReaderLock() {

    }

    // void ReleaseWriterLock()
    ReleaseWriterLock() {

    }

    // void RestoreLock([ref] System.Threading.LockCookie lockCookie)
    RestoreLock() {

    }

    // string ToString()
    ToString() {

    }

    // System.Threading.LockCookie UpgradeToWriterLock(int millisecondsTimeout), System....
    UpgradeToWriterLock() {

    }

}

module.exports = system_threading_readerwriterlock;

