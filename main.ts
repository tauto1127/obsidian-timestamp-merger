import { InputView } from 'input_view';
import { App, Editor, MarkdownView, Modal, Plugin, PluginSettingTab, Setting } from 'obsidian';

interface MyPluginSettings {
	timestampHeader: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	timestampHeader: 'timestamp'
}

export default class ObsidianTimestampMerger extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();
		this.addCommand({
			id: 'obsidian-timestamp-merger',
			name: 'Merge Timestamps',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				const file = this.app.workspace.getActiveFile();
				if(file == null) {
					return
				}
				const cache = this.app.metadataCache.getFileCache(file);
				const sections = cache?.sections;
				const foundHeading = cache?.headings?.find((e) => e.heading === this.settings.timestampHeader);
				if(foundHeading == null) {
					return
				}
				const foundSectionIndex = sections?.findIndex((section) => section.position.start.line === foundHeading.position.start.line && section.type === "heading");
				if(foundSectionIndex == null) {
					return
				}

				const nextHeading = sections?.slice(foundSectionIndex + 1).findIndex((e) => e.type === "heading");
				const restSections = sections?.slice(foundSectionIndex + 1);
				if(nextHeading == null) {
					return
				}
				if(sections == null) {
					return
				}
				if(restSections == null) {
					return
				}
				const lastSection =
            restSections[
                (nextHeading !== -1
                    ? nextHeading
                    : restSections.length) - 1
            ] ?? sections[foundSectionIndex];
				const headingContent = editor.getRange({
					ch: lastSection.position.start.col,
					line: lastSection.position.start.line
				}, {
					ch: lastSection.position.end.col,
					line: lastSection.position.end.line
					})

				const modal = new TimestampMergerModal(this.app, headingContent);
				modal.open();
				const result = await modal.getResult();
				editor.replaceRange(result.map(t => `${t.created} ${t.content}`).join('\n'), 
					{line: foundHeading.position.start.line + 1, ch: 0},
					{line: lastSection.position.end.line, ch: lastSection.position.end.col}
				);
			},
			callback: () => {
				new InputView(this.app).open();
			}
		});
		this.addSettingTab(new TimestampMergerSettingTab(this.app, this));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class TimestampMergerModal extends Modal {
	input = '';
	headerContent = '';
	constructor(app: App, headerContent: string) {
		super(app);
		this.headerContent = headerContent;
		new Setting(this.contentEl)
		.setName('タイムスタンプを入力してください')
		new Setting(this.contentEl)
		.addTextArea(text => {
			text.onChange((value) => {
				this.input = value;
			})
		})

		new Setting(this.contentEl)
		.addButton((btn) => {
			btn.setButtonText('OK').onClick(() => {
				c72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいです72行目で特定のヘッダーの中身をresultで置換したいですonsole.log(this.input);
				this.close();
			})
			})
	}

	onOpen() {
	}

	result: Timestamp[] = [];
	isClosed = false;

	getIsClosed() {
		return this.isClosed;
	}

	onClose() {
		const {contentEl} = this;
		if(this.headerContent != null && this.input != null) {
			const splitedContent = this.headerContent.split('\n');
			let timestamps = this.timestampStrToTimestampArray(splitedContent);

			const inputTimestamps = this.timestampStrToTimestampArray(this.input.split('\n'));
			timestamps = timestamps.concat(inputTimestamps);
			timestamps.sort((a, b) => {
				if(a.created < b.created) {
					return -1;
				} else {
					return 1;
				}
			});
			this.result = [...timestamps];
		}
		contentEl.empty();
		this.isClosed = true
	}

	async getResult(): Promise<Timestamp[]> {
		while (!this.isClosed) {
			await new Promise(resolve => setTimeout(resolve, 100));
		}
		return this.result;
	}

	timestampStrToTimestampArray(splitedContent: string[]) : Timestamp[]{
		const output : Timestamp[] = [];
		// 1行ずつ
		splitedContent.forEach((line, i) => {
			let isEdit	= false;
			const timestamp = {
				created: '',
				content: ''
			}
			// 1行を空白ごとに分割
			splitedContent[i].split(' ').forEach((word, j) => {
				if(j === 0) {
					timestamp.created = word;
				} else {
					timestamp.content += word;
				}
			});
			if(timestamp.content === '') {
				isEdit = true;
				output[output.length - 1].content += timestamp.created;
			}

			if(!isEdit) output.push(timestamp);
		})
		return output;
	}
}
interface Timestamp {
	created: string;
	content: string;
}


class TimestampMergerSettingTab extends PluginSettingTab {
	plugin: ObsidianTimestampMerger;

	constructor(app: App, plugin: ObsidianTimestampMerger) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Timestamp Header')
			.setDesc('Specify where the timestamp should be placed in the note')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.timestampHeader)
				.onChange(async (value) => {
					this.plugin.settings.timestampHeader = value;
					await this.plugin.saveSettings();
				}));
	}
}
