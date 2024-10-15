import { Component } from '@angular/core';
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";
import {AbstractControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent {
  form = new FormGroup({});
  model = { email: 'email@gmail.com', password: ''};
  options: FormlyFormOptions = {
    formState: {
      disabled: false,
    }
  }
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      asyncValidators: {
        gmailValid:{
          expression: (c: AbstractControl) => new Promise((resolve, reject) => {
            setTimeout(()=>{
              resolve(c.value.endsWith('@gmail.com'));
            }, 2000)
          }),
          message: 'Must end with @gmail.com'
        }
      },
      parsers: [
        value => value.toLowerCase()
      ],
      props: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
        type: 'email',
      }
    },
    {
      key: 'password',
      type: 'input',
      props: {
        label: 'Insert password',
        placeholder: 'Enter password',
        required: true,
        type: 'password',
      }
    },
    {
      key: 'keepMeLoggedIn',
      type: 'checkbox',
      defaultValue: false,
      props: {
        label: 'Keep me logged in',
        placeholder: 'Keep me logged in',
        required: true,
      },
      expressions: {
        'props.disabled': (field: FormlyFieldConfig) => {
          return !field.model.email.endsWith('@gmail.com');
        },
        'props.label': (field: FormlyFieldConfig) => {
          return field.model.email.endsWith('@gmail.com') ? 'Keep me logged in' : 'Keep me logged in (not gmail)';
        }
      }
    },
    {
      key: 'select_multi',
      type: 'select',
      props: {
        label: 'Select Multiple',
        placeholder: 'Placeholder',
        description: 'Description',
        required: true,
        multiple: true,
        selectAllOption: 'Select All',
        options: [
          { value: 1, label: 'Option 1' },
          { value: 2, label: 'Option 2' },
          { value: 3, label: 'Option 3' },
          { value: 4, label: 'Option 4', disabled: true },
        ],
      },
      expressions: {
        'props.disabled': 'formState.disabled'
      }
    },
    {
      key: 'Select',
      type: 'select',
      props: {
        label: 'Select',
        placeholder: 'Placeholder',
        description: 'Description',
        required: true,
        options: [
          { value: 1, label: 'Option 1' },
          { value: 2, label: 'Option 2' },
          { value: 3, label: 'Option 3' },
          { value: 4, label: 'Option 4', disabled: true },
        ],
      },
      expressions: {
        'props.disabled': 'formState.disabled'
      }
    },
    {
      key: 'Radio',
      type: 'radio',
      props: {
        label: 'Radio',
        placeholder: 'Placeholder',
        description: 'Description',
        required: true,
        options: [
          { value: 1, label: 'Option 1' },
          { value: 2, label: 'Option 2' },
          { value: 3, label: 'Option 3' },
          { value: 4, label: 'Option 4', disabled: true },
        ],
      },
    },
  ];

  onSubmit(model: any) {
    console.log(model);
  }

  toggleEnabled(){
    this.options.formState.disabled = !this.options.formState.disabled;
  }
}
