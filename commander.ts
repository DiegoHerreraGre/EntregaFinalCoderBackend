import { Command } from 'commander';

const program = new Command();

program
    .version('1.0.0')
    .option('-d', 'Variable para debug', false)
    .option('-p <port>', 'Puerto en el servidor', '3000')
    .option(
        '-m <mode>',
        'Modo de ejecución (development|production)',
        'development'
    )
    .requiredOption(
        '-u <User>',
        'Nombre de usuario',
        'Se declara usuario nuevo'
    )
    .option('-l, --letters [letters...]', 'Letras específicas');

program.parse();

console.log('Options', program.opts());
