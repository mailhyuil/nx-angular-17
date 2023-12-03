import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ValueAccessorDirective } from '../../directives/value-accessor.directive';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  standalone: true,
  imports: [CommonModule],
  hostDirectives: [ValueAccessorDirective],
})
export default class FileUploadComponent {
  value?: string;
  formData = new FormData();
  uploadingImageUrl?: string;
  constructor(
    public valueAccessor: ValueAccessorDirective<string>,
    private readonly fileService: FileService
  ) {
    valueAccessor.value.subscribe((v) => (this.value = v));
  }

  onChange(event: any) {
    if (!event.target) return;
    const file = event.target.files[0];
    if (!file) {
      this.uploadingImageUrl = undefined;
      return;
    }
    this.uploadingImageUrl = URL.createObjectURL(file);
    this.formData.set('file', file);
  }

  upload() {
    const file = this.fileService.upload(this.formData);
    this.valueAccessor.valueChange(file);
    this.valueAccessor.touchedChange(true);
  }
}
