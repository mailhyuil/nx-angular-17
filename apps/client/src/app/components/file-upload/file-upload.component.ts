import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, booleanAttribute } from '@angular/core';
import { ValueAccessorDirective } from '../../directives/value-accessor.directive';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  standalone: true,
  imports: [CommonModule],
  hostDirectives: [ValueAccessorDirective],
})
export default class FileUploadComponent implements OnInit {
  value?: File | File[];
  @Input() accept: string[] = [];
  @Input() label?: string;
  @Input() hint?: string;
  @Input() maxLength?: number;
  @Input({ transform: booleanAttribute }) required = false;
  multiple = false;
  uploadingImageUrl?: string;
  uploadingImageUrls: string[] = [];
  constructor(
    public valueAccessor: ValueAccessorDirective<File | File[] | undefined>
  ) {
    valueAccessor.value.subscribe((value) => {
      value = value;
      this.value = value;
      if (this.isFileArray(value)) {
        this.multiple = true;
        this.setObjectUrls(value);
      }
      if (this.isFile(value)) {
        this.setObjectUrl(value);
      }
    });
  }

  ngOnInit(): void {}

  onChange(event: any) {
    if (!event.target) return;
    const files = event.target.files;
    const isValidated = this.validate(files);
    if (!isValidated) return;
    if (this.isFileArray(this.value)) {
      this.value = Array.from([...this.value, ...files]);
      this.setObjectUrls(this.value);
      this.valueAccessor.valueChange(this.value);
      this.valueAccessor.touchedChange(true);
      return;
    }

    const file = files[0];
    this.value = file;
    this.setObjectUrl(file);
    if (!this.value) return;
    this.valueAccessor.valueChange(this.value);
    this.valueAccessor.touchedChange(true);
  }

  isActive = false;
  onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    const files: FileList = event.dataTransfer.files;
    const isValidated = this.validate(files);
    if (!isValidated) return;
    if (this.multiple) {
      this.isActive = false;
      this.value = Array.from(files);
      this.setObjectUrls(this.value);
      this.valueAccessor.valueChange(this.value);
      this.valueAccessor.touchedChange(true);
    } else {
      this.isActive = false;
      const file = files[0];
      this.value = file;
      this.setObjectUrl(file);
      if (!this.value) return;
      this.valueAccessor.valueChange(this.value);
      this.valueAccessor.touchedChange(true);
    }
  }
  remove(file: File) {
    if (this.isFileArray(this.value)) {
      this.value = this.value.filter((f) => f !== file);
      this.setObjectUrls(this.value);
      this.valueAccessor.valueChange(this.value);
      this.valueAccessor.touchedChange(true);
    }
    if (this.isFile(this.value)) {
      this.value = undefined;
      this.uploadingImageUrl = undefined;
      this.valueAccessor.valueChange(this.value);
      this.valueAccessor.touchedChange(true);
    }
  }

  setObjectUrl(file: File) {
    if (!file) {
      this.uploadingImageUrl = undefined;
      return;
    }
    this.uploadingImageUrl = URL.createObjectURL(file);
  }
  setObjectUrls(files: File[]) {
    if (!files) {
      this.uploadingImageUrls = [];
      return;
    }
    this.uploadingImageUrls = files.map((file) => URL.createObjectURL(file));
  }

  onDragOver(ev: any) {
    this.isActive = true;
    ev.preventDefault();
    ev.stopPropagation();
  }

  onDragLeave(ev: any) {
    ev.preventDefault();
    ev.stopPropagation();
    this.isActive = false;
  }
  private validate(files: FileList | null) {
    if (this.isFileArray(this.value)) {
      if (
        this.maxLength &&
        files &&
        files.length + this.value.length > this.maxLength
      ) {
        alert(`최대 ${this.maxLength}개까지 업로드 가능합니다.`);
        return false;
      }
    }

    if (
      this.maxLength &&
      files &&
      files.length + (this.value ? 1 : 0) > this.maxLength
    ) {
      alert(`최대 ${this.maxLength}개까지 업로드 가능합니다.`);
      return false;
    }

    return true;
  }
  isFileArray(value: File | File[] | undefined): value is File[] {
    return Array.isArray(value);
  }
  isFile(value: File | File[] | undefined): value is File {
    return value instanceof File;
  }
}
