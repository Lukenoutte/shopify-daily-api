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
    pgm.createTable('products', {
        id: 'id',
        origin_id: { type: 'integer', notNull: true },
        title: { type: 'text', notNull: true },
        body_html: { type: 'text', notNull: false },
        vendor: { type: 'text', notNull: true },
        product_type: { type: 'text', notNull: true },
        origin_created_at: { type: 'timestamp', notNull: true },
        handle: { type: 'text', notNull: true },
        origin_updated_at: { type: 'timestamp', notNull: true },
        published_at: { type: 'timestamp', notNull: false },
        template_suffix: { type: 'text', notNull: false },
        published_scope: { type: 'text', notNull: true },
        tags: { type: 'text', notNull: false },
        created_at: { type: 'timestamp', notNull: true, default: pgm.func('CURRENT_TIMESTAMP') },
        updated_at: { type: 'timestamp', notNull: true, default: pgm.func('CURRENT_TIMESTAMP') }
      });

      pgm.sql(`
        CREATE TRIGGER update_timestamp
        BEFORE UPDATE ON products
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
    pgm.dropTable('products');
};
