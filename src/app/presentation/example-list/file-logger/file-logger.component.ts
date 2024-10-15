import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import {Clipboard} from '@angular/cdk/clipboard';

export class LogLine {
  content: string;
  highlightedContent: string | undefined = undefined;

  isHighlighted(): boolean {
    return this.highlightedContent != undefined && this.highlightedContent!.length > 0;
  }

  clearHighlight() {
    this.highlightedContent = undefined;
  }

  get htmlContent(): string {
    return this.isHighlighted()
      ? this.highlightedContent!
      : `<span>${this.content}</span>`;
  }

  tryHighlight(text: string, style: string): boolean {
    let startIndex = 0
    let highlightedText = ''
    let lastIndex = 0
    this.highlightedContent = ''
    let contentLowerCase = this.content.toLowerCase();
    let textLowerCase = text.toLowerCase();
    let found = false;
    while (true) {
      startIndex = contentLowerCase.indexOf(textLowerCase, lastIndex);
      if (startIndex == -1) break;
      if (startIndex > 0) {
        found = true;
        highlightedText = this.content.substring(startIndex, startIndex + text.length);
        this.highlightedContent += this.content.substring(lastIndex, startIndex) +
          `<span style="${style}">${highlightedText}</span>`
        lastIndex = startIndex + text.length;
      }
    }
    this.highlightedContent += this.content.substring(lastIndex);
    if (!found) {
      this.highlightedContent = undefined;
      return false
    }
    return this.isHighlighted();
  }

  constructor(line: string) {
    this.content = line;
    this.highlightedContent = line;
  }
}

export class LogFile {
  lines: LogLine[];

  constructor(fileContent: string) {
    this.lines = this.processText(fileContent);
  }

  public processText(text: string): LogLine[] {
    let char: string
    let lastLineSkipIndex = 0;
    let lines: LogLine[] = [];
    for (let currentCharIndex = 0; currentCharIndex < text.length; currentCharIndex++) {
      if ((char = text[currentCharIndex]) == '\n') {
        lines.push(new LogLine(lines.length + ': ' + text.substring(lastLineSkipIndex, currentCharIndex)))
        lastLineSkipIndex = currentCharIndex + 1;
      }
    }
    return lines;
  }

  push(text: string) {
    this.lines.push(...this.processText(text));
  }

  pushLine(line: LogLine) {
    this.lines.push(line);
  }

  pushLines(lines: LogLine[]) {
    lines.forEach(line => {
      this.pushLine(line);
    });
  }
}


@Component({
  selector: 'app-file-logger',
  templateUrl: './file-logger.component.html',
  styleUrls: ['./file-logger.component.css']
})
export class FileLoggerComponent implements OnInit {
  logFile: LogFile | undefined = undefined;
  logLines: LogLine[] = [];
  @ViewChild('logWindow') logWindow: ElementRef | undefined;
  showingCopyButtonIndex = -1
  startSelectionIndex = -1
  endSelectionIndex = -1
  click = false
  copying = false
  autoscroll = true

  // search
  searchText: string = ''
  lastSearchText: string = ''
  highlightedLineIndexes: number[] = []
  currentSearchResultIndex = 0

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private clipboard: Clipboard) {
  }

  ngOnInit(): void {
    this.http.get('assets/files/debug_1MB.log', {responseType: 'text'}).subscribe(response => {
      console.log("text length: ", response.length)
      this.logFile = new LogFile('');
      let lines = this.logFile.processText(response);
      this.logFile.pushLines(lines.splice(0, 300))
      this.logLines = lines.splice(300);
      this.logWindow!.nativeElement!.scrollTop = this.logWindow?.nativeElement!.scrollHeight;

      // start stream
      setInterval(() => {
        this.addLogLine()
      }, 1000);
    });
  }

  addLogLine() {
    let logLine = this.logLines.shift()
    this.logFile!.pushLine(logLine!);
    this.highlightLine(logLine!, this.logFile!.lines.length - 1, this.searchText);
    if (this.autoscroll) {
      this.logWindow!.nativeElement!.scrollTop = this.logWindow?.nativeElement!.scrollHeight;
    }
  }

  onLogWindowScroll() {
    if (this.logWindow!.nativeElement!.scrollTop >= this.logWindow!.nativeElement!.scrollHeight - 1000) {
      return
    }
    this.autoscroll = false;
  }

  scrollBottom() {
    this.autoscroll = true;
    this.logWindow!.nativeElement!.scrollTop = this.logWindow?.nativeElement!.scrollHeight;
  }

  onLogMouseUp(event: MouseEvent, index: number) {
    this.click = false
    if (this.copying) return
    if (this.startSelectionIndex == this.endSelectionIndex) {
      this.unselectText()
    } else {
      this.showingCopyButtonIndex = index;
    }
  }

  onLogMouseDown(event: MouseEvent, index: number) {
    this.click = true;
    if (this.copying) return
    this.startSelectionIndex = index;
    this.endSelectionIndex = index
  }

  onLogMouseEnter(event: MouseEvent, index: number) {
    if (this.click) {
      if (index < this.startSelectionIndex) {
        this.endSelectionIndex = index;
        this.startSelectionIndex = index;
      } else {
        this.endSelectionIndex = index;
      }
    } else {
      if (!this.isSelectedText()) {
        this.showingCopyButtonIndex = index;
      }
    }
  }

  onLogMouseLeave(event: MouseEvent, index: number) {
    if (this.click) {

    } else {
      if (!this.isSelectedText()) {
        this.showingCopyButtonIndex = -1;
      }
    }
  }

  isSelectedText(): boolean {
    return this.startSelectionIndex != -1 && this.endSelectionIndex != -1;
  }

  unselectText() {
    this.showingCopyButtonIndex = -1;
    this.startSelectionIndex = -1;
    this.endSelectionIndex = -1;
  }

  isBetweenSelection(index: number): boolean {
    return this.startSelectionIndex <= index && index <= this.endSelectionIndex;
  }

  hasToShowCopyButton(index: number) {
    return this.showingCopyButtonIndex == index;
  }

  highlightLine(line: LogLine, index: number, text: string) {
    if (text.length > 0) {
      let lineHighlighted = line.tryHighlight(text, 'color: blue;');
      if (lineHighlighted) {
        console.log(index)
        this.highlightedLineIndexes.push(index)
      }
    } else {
      line.clearHighlight()
    }
  }

  lineContent(logLine: LogLine) {
    return this.sanitizer.bypassSecurityTrustHtml(logLine.htmlContent);
  }

  onSearchEvent($event: KeyboardEvent) {
    if ($event.key.toLowerCase() != 'enter') return;

    if (this.lastSearchText != this.searchText) {
      this.lastSearchText = this.searchText;
      this.highlightedLineIndexes = []

      this.logFile!.lines.forEach((line, index) => {
        this.highlightLine(line, index, this.searchText);
      });

      if (this.highlightedLineIndexes.length > 0) {
        this.currentSearchResultIndex =
          Math.trunc(this.logWindow?.nativeElement!.scrollTop
            / this.logWindow?.nativeElement!.scrollHeight
            * this.highlightedLineIndexes.length);
      } else {
        return
      }

    } else {
      this.currentSearchResultIndex++
      if (this.currentSearchResultIndex >= this.highlightedLineIndexes.length) {
        this.currentSearchResultIndex = 0
      }
    }

    this.logWindow!.nativeElement!.scrollTop =
      (this.highlightedLineIndexes[this.currentSearchResultIndex]
        / this.logFile!.lines!.length)
      * this.logWindow?.nativeElement!.scrollHeight;
  }

  onCopyClick(index: number) {
    if (this.isSelectedText()) {
      let selectedText = ''
      for (let i = this.startSelectionIndex; i <= this.endSelectionIndex; i++) {
        selectedText += this.logFile!.lines[i].content + '\n'
      }
      this.clipboard.copy(selectedText);
    } else {
      this.clipboard.copy(this.logFile!.lines[index].content);
    }
  }
}
