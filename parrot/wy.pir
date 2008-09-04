=head1 TITLE

wy.pir - A Wy compiler.

=head2 Description

This is the base file for the Wy compiler.

This file includes the parsing and grammar rules from
the src/ directory, loads the relevant PGE libraries,
and registers the compiler under the name 'Wy'.

=head2 Functions

=over 4

=item onload()

Creates the Wy compiler using a C<PCT::HLLCompiler>
object.

=cut

.namespace [ 'Wy::Compiler' ]

.loadlib 'wy_group'

.sub 'onload' :anon :load :init
    load_bytecode 'PCT.pbc'

    $P0 = get_hll_global ['PCT'], 'HLLCompiler'
    $P1 = $P0.'new'()
    $P1.'language'('Wy')
    $P1.'parsegrammar'('Wy::Grammar')
    $P1.'parseactions'('Wy::Grammar::Actions')

    $P1.'commandline_banner'("Wy for Parrot VM\n")
    $P1.'commandline_prompt'('> ')
.end

=item main(args :slurpy)  :main

Start compilation by passing any command line C<args>
to the Wy compiler.

=cut

.sub 'main' :main
    .param pmc args

    $P0 = compreg 'Wy'
    $P1 = $P0.'command_line'(args)
.end


.include 'src/gen_builtins.pir'
.include 'src/gen_grammar.pir'
.include 'src/gen_actions.pir'

=back

=cut

# Local Variables:
#   mode: pir
#   fill-column: 100
# End:
# vim: expandtab shiftwidth=4 ft=pir:

