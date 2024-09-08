import { MigrationBuilder } from 'node-pg-migrate';

/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm: MigrationBuilder) => {
    pgm.createTable('product_variants', {
        id: 'id',
        product_id: {
            type: 'integer',
            notNull: true,
            references: '"products"',
            onDelete: 'CASCADE',
        },
        origin_id: {
            type: 'integer',
            notNull: true,
        },
        origin_product_id: {
            type: 'integer',
            notNull: true,
        },
        title: {
            type: 'varchar(255)',
            notNull: true,
        },
        price: {
            type: 'varchar(50)',
            notNull: true,
        },
        sku: {
            type: 'varchar(50)',
            notNull: true,
        },
        position: {
            type: 'integer',
            notNull: true,
        },
        compare_at_price: {
            type: 'varchar(50)',
        },
        fulfillment_service: {
            type: 'varchar(100)',
        },
        inventory_management: {
            type: 'varchar(100)',
        },
        option1: {
            type: 'varchar(255)',
            notNull: true,
        },
        option2: {
            type: 'varchar(255)',
        },
        option3: {
            type: 'varchar(255)',
        },
        origin_created_at: {
            type: 'timestamp',
            notNull: true,
        },
        origin_updated_at: {
            type: 'timestamp',
            notNull: true,
        },
        taxable: {
            type: 'boolean',
            notNull: true,
        },
        barcode: {
            type: 'varchar(255)',
        },
        grams: {
            type: 'integer',
            notNull: true,
        },
        image_id: {
            type: 'integer',
        },
        weight: {
            type: 'numeric',
            notNull: true,
        },
        weight_unit: {
            type: 'varchar(10)',
            notNull: true,
        },
        requires_shipping: {
            type: 'boolean',
            notNull: true,
        },
        quantity_rule_min: {
            type: 'integer',
            notNull: true,
        },
        quantity_rule_max: {
            type: 'integer',
        },
        quantity_rule_increment: {
            type: 'integer',
            notNull: true,
        },
        price_currency: {
            type: 'varchar(10)',
            notNull: true,
        },
        compare_at_price_currency: {
            type: 'varchar(10)',
        },
        quantity_price_breaks: {
            type: 'jsonb',
        },
        created_at: {
            type: 'timestamp',
            default: pgm.func('current_timestamp'),
        },
        updated_at: {
            type: 'timestamp',
            default: pgm.func('current_timestamp'),
        },
        });

        pgm.sql(`
            CREATE TRIGGER update_timestamp
            BEFORE UPDATE ON product_variants
            FOR EACH ROW
            EXECUTE PROCEDURE trigger_set_timestamp();
        `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm: MigrationBuilder) => {
    pgm.dropTable('product_variants');
};
