class Wy::Grammar::Actions;

method TOP($/) {
  make $/;
}

method block($/) {
#  my $stats := $( $<statement> );
#  if (scalar($stats) == 1) {
#    make $/;
#  } else {
    my $past := PAST::Block.new( :blocktype('immediate'), :node( $/ ) );
    for $<statement> {
      $past.push( $( $_ ) );
    }
    make $past;
#  }
}

method statement($/, $key) {
#     if ($key eq 'applic') {
#       my $params := $( $<params> );
#       my $first := $params[0];
#       $first.name($( $<id> ));
#       my $count := 0;
#       while($count < scalar($params)-1) {
#         $params[$count+1].unshift($params[count]);
#         $count++;
#       }
#       make $params[-1];
#     } else {
      make $( $/{$key} );
#    }
}

method params($/) {
    my $past := PAST::Op.new(:pasttype('call'), :node( $/ ) );
    for $<block> {
      $past.push( $( $_ ) );
    }
    make $past;
}

method value($/, $key) {
    make $( $/{$key} );
}

method integer($/) {
    make PAST::Val.new( :value( ~$/ ), :returns('Integer'), :node($/) );
}

method quote($/) {
    make PAST::Val.new( :value( $($<string_literal>) ), :node($/) );
}

