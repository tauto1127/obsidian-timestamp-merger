import { InputView } from 'input_view';
import { App, Editor, MarkdownView, Modal, Plugin, PluginSettingTab, Setting } from 'obsidian';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	timestampHeader: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	timestampHeader: 'timestamp'
}

export default class ObsidianTimestampMerger extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		console.log("loaded timestampmerger");
		await this.loadSettings();
		// Perform additional things with the ribbon
		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'obsidian-timestamp-merger',
			name: 'Merge Timestamps',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getValue())
				//var cache = this.app.workspace.getActiveFile().
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

				console.log("headingContent: " + headingContent)

			},
			callback: () => {
				new InputView(this.app).open();
			}
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: 'open-sample-modal-complex',
			name: 'Open sample modal (complex)',
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						new SampleModal(this.app).open();
					}

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));
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

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

class SampleSettingTab extends PluginSettingTab {
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
