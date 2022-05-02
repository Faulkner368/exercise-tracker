export class ReadFileContent {
    private _reader: FileReader;
    public fileContent: string;
    
    public get reader(): FileReader {
        return this._reader;
    }

    constructor() {}

    public readFileReturnContentAndTearDown(file: File): void {
        this.tearDown();
        this.reader.readAsText(file);

        this.reader.onload = (ev: ProgressEvent) => {
            this.fileContent = this.reader.result as string;
        },
        (error: any) => {
            console.error(error);
        }
    }

    private tearDown(): void {
        this._reader = new FileReader();
        this.fileContent = '';
    }
}