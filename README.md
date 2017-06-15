# Medical documentation management
Web application project intended to manage documentation in medical organization.

#### Version
1.0.1

#### Pre-requirements
 - .NET Framework 4.5.2
 - MS SQL Server 2014
 - npm

#### Installation
For installing required libs and frameworks execute next commands:
```sh
    git clone git@github.com:Shooter75/medical_doc_managment.git
    cd MedicalDocManagment.WebUI
    npm install
    gulp default
```
Next step you need to add [MultipartDataMediaFormatter.dll][mdmf] library to WebUI project.

#### Fixtures
`DbInitializer` executes every time after project have rebuilt. 

Default access for admin:
- Login: admin
- Password: password

#### Tech
Project are built on following technologies:

* [Angular 2] - Good tools make application development quicker and easier to maintain than if you did everything by hand.
* [angular2-masonry] - Masonry is a JavaScript grid layout library.
* [Bootstrap 3] - great UI boilerplate for modern web apps
* [Entity Framework] - The Entity Framework is a set of technologies in ADO.NET that support the development of data-oriented software applications.
* [Fluent Validation] - A small validation library for .NET that uses a fluent interface and lambda expressions for building validation rules for your business objects. 
* [Gulp] - is a toolkit for automating painful or time-consuming tasks in your development workflow
* [jQuery] - jQuery is a fast, small, and feature-rich JavaScript library.
* [mydatepicker] - Highly configurable Angular datepicker.
* [Multipart Data Media Formatter] - A library for binding custom types (including files) when sending and receiving multipart encoded form data
* [ng2-pagination] - The solution for pagination in Angular.
* [ngx-infinite-scroll] - the directive listens to the window scroll event and invoked the callback.
* [TinyMCE] - awesome web-based text editor

#### License 
BSD

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen.)

   [mdmf]: <https://drive.google.com/file/d/0B5Enfvbd5jx5QUcyVDg1M29PNXc/view?usp=sharing>
   [TinyMCE]: <https://www.tinymce.com/>
   [Bootstrap 3]: <http://getbootstrap.com/>
   [jQuery]: <http://jquery.com>
   [angular2-masonry]: <https://www.npmjs.com/package/angular2-masonry>
   [Angular 2]: <https://angular.io/>
   [Gulp]: <http://gulpjs.com>
   [Multipart Data Media Formatter]: <https://www.nuget.org/packages/MultipartDataMediaFormatter>
   [Entity Framework]: <https://msdn.microsoft.com/en-us/library/aa937723(v=vs.113).aspx>
   [Fluent Validation]: <https://github.com/JeremySkinner/FluentValidation>
   [mydatepicker]: <https://github.com/kekeh/mydatepicker>
   [ng2-pagination]: <https://github.com/michaelbromley/ngx-pagination>
   [ngx-infinite-scroll]: <https://github.com/orizens/ngx-infinite-scroll>
