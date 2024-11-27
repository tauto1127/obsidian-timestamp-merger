import { Modal } from "obsidian";

export class InputView extends Modal {
    getViewType(): string {
		return 'input';
    }
    getDisplayText(): string {
		return 'Input';
    }

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Please enter timestamps');

		//const textArea = contentEl.createEl('textarea', {
		//	cls: 'multi-line-textarea',
		//	});
		const textArea = contentEl.createEl('textarea', {
			});


		textArea.rows = 10;
	}

	onClose() {
		this.contentEl.empty;
	}

}
