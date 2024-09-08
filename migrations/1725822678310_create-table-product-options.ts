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
    pgm.createTable('product_options', {
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
        name: {
          type: 'varchar(255)',
          notNull: true,
        },
        position: {
          type: 'integer',
          notNull: true,
        },
        values: {
          type: 'text[]',
          notNull: true,
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
        BEFORE UPDATE ON product_options
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
    pgm.dropTable('product_options');
};
