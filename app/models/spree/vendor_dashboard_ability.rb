require 'cancan'

module Spree
  class VendorDashboardAbility
    include CanCan::Ability

    def initialize(user)
      @vendor_ids = user.vendors.pluck(:id)

      if @vendor_ids.any?
        apply_vendor_dashboard_permissions
        apply_vendor_order_permissions
      end
    end

    private

    def apply_vendor_dashboard_permissions
      can :manage, :vendor_dashboard
    end

    def apply_vendor_order_permissions
      can [:cart, :store, :customer], Spree::Order, line_items: { variant: { vendor_id: @vendor_ids } }
      can :index, :admin_order_state_changes
    end
  end
end
