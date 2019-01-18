Deface::Override.new(
  virtual_path:  'spree/layouts/admin',
  name:          'add_base_href',
  insert_bottom: 'head',
  text:       <<-HTML
                <base href="/admin/vendor_dashboard/">
              HTML
)