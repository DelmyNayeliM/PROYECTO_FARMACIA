import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return React.createElement(
    'div',
    { className: 'site-navbar py-2' },
    React.createElement(
      'div',
      { className: 'container' },
      React.createElement(
        'div',
        { className: 'd-flex align-items-center justify-content-between' },
        React.createElement(
          'div',
          { className: 'logo' },
          React.createElement(
            'div',
            { className: 'site-logo' },
            React.createElement(
              Link,
              { to: '/', className: 'js-logo-clone' },
              React.createElement('strong', { className: 'text-primary' }, 'DISPENSARIO MEDICO '),
              '"EL CAJON"'
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'main-nav d-none d-lg-block' },
          React.createElement(
            'nav',
            { className: 'site-navigation text-right text-md-center', role: 'navigation' },
            React.createElement(
              'ul',
              { className: 'site-menu js-clone-nav d-none d-lg-block' },
              React.createElement(
                'li',
                null,
                React.createElement(Link, { to: '/' }, 'Inicio')
              ),
              React.createElement(
                'li',
                null,
                React.createElement(Link, { to: '/inventario' }, 'Inventario')
              ),
              React.createElement(
                'li',
                { className: 'has-children' },
                React.createElement('a', { href: '#' }, 'Categoria'),
                React.createElement(
                  'ul',
                  { className: 'dropdown' },
                  React.createElement(
                    'li',
                    null,
                    React.createElement(Link, { to: '/medicamentos' }, 'Medicamentos')
                  ),
                  React.createElement(
                    'li',
                    null,
                    React.createElement(Link, { to: '/suplementos' }, 'Suplementos')
                  ),
                  React.createElement(
                    'li',
                    null,
                    React.createElement(Link, { to: '/material' }, 'Material')
                  )
                )
              ),
              React.createElement(
                'li',
                null,
                React.createElement(Link, { to: '/citas' }, 'Citas')
              ),
              React.createElement(
                'li',
                null,
                React.createElement(Link, { to: '/pacientes' }, 'Pacientes')
              ),
              React.createElement(
                'li',
                null,
                React.createElement(Link, { to: '/about' }, 'Acerca de...')
              )
            )
          )
        )
      )
    )
  );
};

export default Navbar;
